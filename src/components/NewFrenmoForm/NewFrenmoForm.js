import React, {
  Component
} from 'react';

import FrenmoContext from '../../contexts/FrenmoContext';
import FrenmoApiService from '../../services/frenmo-api-service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button,
  Label,
  Input,
  Textarea
} from '../Utils/Utils';

import './NewFrenmoForm.css';

class NewFrenmoForm extends Component {
  static defaultProps = {
    match: { params: {} },
    history: {
      push: () => {}
    },
    onRedirect: () => {}
  };

  static contextType = FrenmoContext;
  state = {
    expDate: new Date(),
    postRes: {},
    give: true,
    ask: false,
    receiver_id: null,
    user_id: null,
    receiver: '',
    user: ''
  };

  handleChange = date => {
    this.setState({
      expDate: date
    });
  };

  handleChangePerson = event => {
    //change person id and handle
  };

  getCategories = () => {
    //TODO: maybe put this in the api
  };

  handleIssue = fields => {
    FrenmoApiService.issueFrenmo(fields)
      .then(() => {
        //do a set state
      })
      .catch();
  };

  handleSubmit = event => {
    event.preventDefault();

    const {
      title,
      description,
      category,
      expiration_date,
      publicity,
      favor_id,
      receiver,
      user,
      limit
    } = event.target;

    FrenmoApiService.postFrenmo(
      title.value,
      description.value,
      category.value,
      expiration_date.value,
      publicity.value,
      limit.value
    )
      .then(postRes =>
        this.setState({ postRes })
      )
      .then(() => {
        this.handleIssue();
      })
      .then(this.context.addFrenmo)
      .then(() => {
        title.value = '';
        description.value = '';
        category.value = 0;
        expiration_date.value = '';
        publicity.value = 0;
        limit.value = '';
        favor_id.value = '';
        user.value = '';
        receiver.value = '';
        this.props.onRedirect(
          this.state.postRes.favor_id
        );
      })
      .catch(this.context.setError);
  };

  renderForm = () => {
    let sendPortion = (
      <>
        <div className="NewFrenmo__input-container">
          <Label htmlFor="NewFrenmo__receiver">
            Give To:
          </Label>
          <Input
            type="text"
            name="receiver"
            id="NewFrenmo__receiver"
            aria-label="Add receiver for frenmo"
          />
        </div>
        <Button type="submit">
          Send Frenmo
        </Button>
      </>
    );
    let askPortion = (
      <>
        <div className="NewFrenmo__input-container">
          <Label htmlFor="NewFrenmo__user">
            Request From:
          </Label>
          <Input
            type="text"
            name="user"
            id="NewFrenmo__user"
            aria-label="Add user for frenmo"
          />
        </div>
        <Button type="submit">
          Request Frenmo
        </Button>
      </>
    );
    let formtype;
    let giverOrReceiver;
    if (this.state.give) {
      formtype = 'send';
      giverOrReceiver = sendPortion;
    } else if (this.state.ask) {
      formtype = 'ask';
      giverOrReceiver = askPortion;
    }
    let generalForm = (
      <form
        className={`NewFrenmoForm__${formtype}`}
        onSubmit={this.handleSubmit}
      >
        {/* <Label htmlFor="NewFrenmo__title">Redeemable For:</Label> */}
        <Input
          type="text"
          name="title"
          id="NewFrenmo__title"
          placeholder="Redeemable for..."
          aria-label="Add title for frenmo"
          required
        />

        {/* <Label htmlFor="NewFrenmo__description">Frenmo Description:</Label> */}
        <Textarea
          id="NewFrenmo__description"
          name="description"
          placeholder="Add a message..."
          aria-label="Add description for frenmo"
          required
        />

        {/* <Label htmlFor="NewFrenmo__category">Select a category:</Label> */}
        <select
          id="NewFrenmo__category"
          name="category"
          aria-label="Select category for frenmo"
          required
        >
          {/** TODO:can generate this on the fly from categories */}
          <option value="0">
            --Please choose a category--
          </option>
          <option value="1">
            Advice
          </option>
          <option value="2">
            Career
          </option>
          <option value="3">
            Community
          </option>
          <option value="4">
            Creative
          </option>
          <option value="5">
            Education
          </option>
          <option value="6">
            Emergency
          </option>
          <option value="7">
            Family
          </option>
          <option value="8">
            Food
          </option>
          <option value="9">
            Gaming
          </option>
          <option value="10">
            Health
          </option>
          <option value="11">IT</option>
          <option value="12">
            Kids
          </option>
          <option value="13">
            Miscellaneous
          </option>
          <option value="14">
            Needs fixing
          </option>
          <option value="15">
            Pets
          </option>
          <option value="16">
            Plants
          </option>
          <option value="17">
            Relationship
          </option>
          <option value="18">
            Religion & Spirituality
          </option>
          <option value="19">
            Ridesharing
          </option>
          <option value="20">
            Sports
          </option>
          <option value="21">
            Travel
          </option>
          <option value="22">
            Volunteers Needed
          </option>
          <option value="23">
            Wedding
          </option>
        </select>
        <div className="NewFrenmo__input-container">
          <Label htmlFor="NewFrenmo__expiration-date">
            Valid until:
          </Label>
          <DatePicker
            selected={
              this.state.expDate
            }
            onChange={this.handleChange}
            id="NewFrenmo__expiration-date"
            name="expiration_date"
            aria-label="Select expiration date for frenmo"
          />
        </div>
        <select
          id="NewFrenmo__publicity"
          name="publicity"
          aria-label="Select privacy setting for frenmo"
          required
        >
          <option value="0">
            --Please set privacy--
          </option>
          <option value="dm">
            Direct Message
          </option>
          <option value="friend">
            Friends Only
          </option>
          <option value="public">
            Public
          </option>
        </select>
        <div className="NewFrenmo__input-container">
          <Label htmlFor="NewFrenmo__limit">
            Set Limit:
          </Label>
          <Input
            type="number"
            name="limit"
            id="NewFrenmo__limit"
            min="1"
            aria-label="Add limit for frenmo"
          />
        </div>
        {giverOrReceiver}
      </form>
    );
    return generalForm;
  };

  render() {
    return (
      <div className="NewFrenmoForm__container">
        {/**tabs for different ways to make a form */}
        <button
          type="button"
          onClick={() =>
            this.setState({
              ...this.state,
              give: true,
              ask: false
            })
          }
        >
          Give a favor
        </button>
        <button
          type="button"
          onClick={() =>
            this.setState({
              ...this.state,
              give: false,
              ask: true
            })
          }
        >
          {' '}
          Ask a favor
        </button>
        {this.renderForm()}
      </div>
    );
  }
}

export default NewFrenmoForm;
