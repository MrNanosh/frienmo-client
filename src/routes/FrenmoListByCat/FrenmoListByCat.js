import React, {
  Component
} from 'react';
import Frenmo from '../../components/Frenmo/Frenmo';
import {
  getFrenmosInCategory,
  getRecdFrenmos,
  getIssuedFrenmos
} from '../../services/helpers';
import FrenmoContext from '../../contexts/FrenmoContext';
import FrenmoApiService from '../../services/frenmo-api-service';
import { Button } from '../../components/Utils/Utils';

import './FrenmoListByCat.scss';
import TokenService from '../../services/token-service';
import { Redirect } from 'react-router-dom';
import FriendBubbles from '../../components/FriendBubbles/FriendBubbles';

class FrenmoListByCat extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => {}
    }
  };

  static contextType = FrenmoContext;

  state = {
    myFrenmos: []
  };

  handleMakeFrenmos(user_id) {
    let {
      publicFrenmos,
      personalFrenmos,
      friendFrenmos
    } = this.context;
    const {
      categoryId
    } = this.props.match.params;
    publicFrenmos = getFrenmosInCategory(
      publicFrenmos,
      categoryId
    );
    personalFrenmos = getFrenmosInCategory(
      personalFrenmos,
      categoryId
    );
    friendFrenmos = getFrenmosInCategory(
      friendFrenmos,
      categoryId
    );
    const drawFrenmos = (
      frenmo,
      idx
    ) => {
      let issued =
        frenmo.issuer_id === user_id;

      let received =
        frenmo.receiver_id === user_id;

      let expired =
        new Date(
          new Date(
            frenmo.expiration_date
          ).toLocaleString()
        ) < new Date();

      let redeemed =
        frenmo.issuer_redeemed ===
          true &&
        frenmo.receiver_redeemed ===
          true;

      let pending =
        frenmo.receiver_redeemed ===
          true &&
        frenmo.issuer_redeemed ===
          false;

      return {
        frenmo: (
          <Frenmo
            key={frenmo.outstanding_id}
            title={frenmo.title}
            description={
              frenmo.description
            }
            creator_id={
              frenmo.creator_id
            }
            expiration_date={
              frenmo.expiration_date
            }
            publicity={frenmo.publicity}
            user_location={
              frenmo.user_location
            }
            tags={frenmo.tags}
            limit={frenmo.limit}
            posted={frenmo.posted}
            outstanding_id={
              frenmo.outstanding_id
            }
            receiver_redeemed={
              frenmo.receiver_redeemed
            }
            issuer_redeemed={
              frenmo.issuer_redeemed
            }
            relationship={
              frenmo.relationship
            }
            favor_id={frenmo.favor_id}
            creator_name={
              frenmo.creator_name
            }
            creator_username={
              frenmo.creator_username
            }
            issuer_id={frenmo.issuer_id}
            issuer_name={
              frenmo.issuer_name
            }
            issuer_username={
              frenmo.issuer_username
            }
            receiver_id={
              frenmo.receiver_id
            }
            receiver_name={
              frenmo.receiver_name
            }
            receiver_username={
              frenmo.receiver_username
            }
            categoryId={frenmo.category}
            issued={issued}
            redeemed={redeemed}
            expired={expired}
            received={received}
            pending={pending}
          />
        ),
        issued,
        redeemed,
        expired,
        received,
        pending
      };
    };
    let myPublicFrenmos;
    let myPrivateFrenmos;
    let myFriendFrenmos;

    myPublicFrenmos = publicFrenmos.favors.map(
      drawFrenmos
    );
    myPrivateFrenmos = personalFrenmos.favors.map(
      drawFrenmos
    );
    myFriendFrenmos = friendFrenmos.favors.map(
      drawFrenmos
    );
    return [
      ...myPublicFrenmos,
      ...myPrivateFrenmos,
      ...myFriendFrenmos
    ];
  }
  async componentDidMount() {}
  renderAll = myFrenmos => {
    return myFrenmos.map(
      item => item.frenmo
    );
  };
  renderReceived = myFrenmos => {
    return myFrenmos
      .filter(
        item => item.received === true
      )
      .map(item => item.frenmo);
  };
  renderRedeemed = myFrenmos => {
    return myFrenmos
      .filter(
        item => item.redeemed === true
      )
      .map(item => item.frenmo);
  };
  renderIssued = myFrenmos => {
    return myFrenmos
      .filter(
        item => item.issued === true
      )
      .map(item => item.frenmo);
  };

  renderExpired = myFrenmos => {
    return myFrenmos
      .filter(
        item => item.expired === true
      )
      .map(item => item.frenmo);
  };
  renderPending = myFrenmos => {
    return myFrenmos
      .filter(
        item => item.pending === true
      )
      .map(item => item.frenmo);
  };

  renderTypes() {
    const { user } = this.context;

    return (
      <>
        <div className="FrenmoListByCat__Buttons">
          <button
            className="FrenmoListByCat__tabs"
            onClick={() =>
              this.setState({
                type: 'all'
              })
            }
          >
            All
          </button>
          <button
            className="FrenmoListByCat__tabs"
            onClick={() => {
              this.setState({
                type: 'received'
              });
            }}
          >
            Received
          </button>
          <button
            className="FrenmoListByCat__tabs"
            onClick={() => {
              this.setState({
                type: 'issued'
              });
            }}
          >
            Issued
          </button>
          <button
            className="FrenmoListByCat__tabs"
            //this.handleredeemed
            onClick={() => {
              this.setState({
                type: 'redeemed'
              });
            }}
          >
            Redeemed
          </button>

          <button
            className="FrenmoListByCat__tabs"
            onClick={() => {
              this.setState({
                type: 'pending'
              });
            }}
          >
            Pending
          </button>
          <button
            className="FrenmoListByCat__tabs"
            onClick={() => {
              this.setState({
                type: 'expired'
              });
            }}
          >
            Expired
          </button>
        </div>
      </>
    );
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    let user_id;
    let jwtPayload;

    jwtPayload = TokenService.parseAuthToken();
    user_id = jwtPayload.user_id;

    let displayed;
    let myFrenmos = this.handleMakeFrenmos(
      user_id
    );
    switch (this.state.type) {
      case 'redeemed':
        displayed = this.renderRedeemed(
          myFrenmos
        );
        break;
      case 'issued':
        displayed = this.renderIssued(
          myFrenmos
        );
        break;
      case 'received':
        displayed = this.renderReceived(
          myFrenmos
        );
        break;
      case 'expired':
        displayed = this.renderExpired(
          myFrenmos
        );
        break;
      case 'pending':
        displayed = this.renderPending(
          myFrenmos
        );
        break;
      default:
        displayed = this.renderAll(
          myFrenmos
        );
        break;
    }

    return (
      <>
        {this.renderTypes()}

        <div className="FrenmoListByCat__titles">
          <div className="FrenmoListByCat__subtitles">
            {displayed}
          </div>
        </div>
      </>
    );
  }
}

export default FrenmoListByCat;
