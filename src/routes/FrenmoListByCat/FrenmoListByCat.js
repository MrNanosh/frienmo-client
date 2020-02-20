import React, { Component } from "react";
import Frenmo from "../../components/Frenmo/Frenmo";
import { getFrenmosInCategory } from "../../services/helpers";
import FrenmoContext from "../../contexts/FrenmoContext";
import UserContext from "../../contexts/UserContext";
import FrenmoApiService from "../../services/frenmo-api-service";
import UserId from "../../components/UserId/UserId";
import "./FrenmoListByCat.css";

class FrenmoListByCat extends Component {
  static defaultProps = {
    match: {
      params: {}
    },
    myFrenmos: []
  };

  static contextType = FrenmoContext;

  state = {
    type: "",
    activeTab: "",
    myFrenmos: []
  };

  async componentDidMount() {
    this.context.clearError();
    await FrenmoApiService.getAllPublicFrenmos()
      .then(this.context.setAllPublic)
      .catch(this.context.setError);
    await FrenmoApiService.getPersonalFrenmos()
      .then(this.context.setAllPersonal)
      .catch(this.context.setError);
    await FrenmoApiService.getFriendFrenmos()
      .then(this.context.setAllFriend)
      .catch(this.context.setError);

    let { publicFrenmos, personalFrenmos, friendFrenmos } = this.context;

    const drawFrenmos = (frenmo, idx) => {
      return (
        <Frenmo
          // key={idx}
          frenmoId={frenmo.id}
          outstandingId={frenmo.outstanding_id}
          title={frenmo.title}
          description={frenmo.description}
          expiration_date={frenmo.expiration_date}
          publicity={frenmo.publicity}
          createdById={frenmo.creator_id}
          createdBy={frenmo.creator_name}
          issuedById={frenmo.issuer_id}
          issuedBy={frenmo.issuer_name}
          receivedById={frenmo.receiver_id}
          receivedBy={frenmo.receiver_name}
          categoryId={frenmo.category}
        />
      );
    };

    let myPublicFrenmos = publicFrenmos.favors.map(drawFrenmos);
    let myPrivateFrenmos = personalFrenmos.favors.map(drawFrenmos);
    let myfriendFrenmos = friendFrenmos.favors.map(drawFrenmos);
    this.setState({
      myFrenmos: [...myPublicFrenmos, ...myPrivateFrenmos, ...myfriendFrenmos]
    });
  }

  setContext = () => {
    return (
      <FrenmoContext.Consumer>
        {frenmo => (
          <UserContext.Consumer>
            {user => console.log(user)}
          </UserContext.Consumer>
        )}
      </FrenmoContext.Consumer>
    );
  };

  handleToggleTabs = () => {
    console.log("state in list by cat", this.state.myFrenmos);

    //   if (frenmo.receiver_id === user.id && !redeemed) {
    //     this.setState({})
    //   } else if (issued ? frenmo.issuer_id === user.id && !frenmo.issuer_id) {
    //   } else if (redeemed ? frenmo.receiver_id === user.id && frenmo.receiver_redeemed === true || frenmo.issuer_id === user.id && frenmo.issuer_redeemed === true) {
    //  } else if (expired ? currentdate > exp date && frenmo.receiver_redeemed === false || frenmo.issuer_redeemed === false) {
    //  }
  };

  renderTypes() {
    return (
      <div className="btn-container">
        <button
          className="CatNavPage__tabs"
          onClick={
            () => this.setContext()
            // this.setState({
            //   type: "received"
            // })
          }
        >
          Received
        </button>
        <button
          className="CatNavPage__tabs"
          onClick={() =>
            this.setState({
              type: "issued"
            })
          }
        >
          Issued
        </button>
        <button
          className="CatNavPage__tabs"
          onClick={() =>
            this.setState({
              type: "redeemed"
            })
          }
        >
          Redeemed
        </button>
        <button
          className="CatNavPage__tabs"
          onClick={() =>
            this.setState({
              type: "expired"
            })
          }
        >
          Expired
        </button>
      </div>
    );
  }

  render() {
    const { categoryId } = this.props.match.params;
    console.log(this.state.type);
    const frenmosByCat = getFrenmosInCategory(this.state.myFrenmos, categoryId);

    return (
      <>
        <UserId />
        <div className="btn-container">{this.renderTypes()}</div>
        <div className="ListByCat__section">
          <ul>{frenmosByCat}</ul>
        </div>
      </>
    );
  }
}

export default FrenmoListByCat;
