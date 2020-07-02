import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import gameService from '../services/gameService';
import GameCard from '../components/gameCard';
import Modal from '../components/modal';
import Input from '../components/input';
import theme from '../theme';

const GamesListContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  flex-wrap: wrap;
  flex-basis: content;
  flex-direction: row;
  margin: 0 20%;
  max-width: 60%;

  @media (max-width: 800px) {
    margin: 0;
  }
`;

const PasswordInput = styled(Input)`
  display: inline-block;
  width: 50%;
  margin: 0 auto;
`;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingGames: true,
      games: [],
      page: props.page || 1,
      isPasswordModalShowing: false,
      passwordText: '',
      wasPasswordCorrect: null,
      investigatingGame: null,
    };
  }

  handleJoinClicked = (game) => {
    const { history } = this.props;
    if (!game.config.isPrivate) {
      history.push(`/game/${game.id}`);
    } else {
      // check password
      this.setState({ isPasswordModalShowing: true, investigatingGame: game });
    }
  };

  handlePasswordChanged = (event) => {
    this.setState({ passwordText: event.currentTarget?.value });
  };

  handlePasswordSubmitted = async () => {
    const { investigatingGame, passwordText } = this.state;
    const isCorrect = await gameService.checkPassword(
      investigatingGame.id,
      passwordText
    );
    if (isCorrect) {
      this.props.history.push(`/game/${this.state.investigatingGame.id}`);
    }
  };

  handleCancelJoiningGame = () => {
    this.setState({
      passwordText: '',
      isPasswordModalShowing: false,
      investigatingGame: null,
    });
  };

  componentDidMount() {
    gameService.getGames(this.state.page).then((games) => {
      this.setState({ games, isLoadingGames: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      gameService.getGames(this.state.page).then((games) => {
        this.setState({ games, isLoadingGames: false });
      });
    }
  }

  render() {
    const { user, history } = this.props;
    const {
      isLoadingGames,
      games,
      page,
      isPasswordModalShowing,
      passwordText,
    } = this.state;
    return (
      <>
        {isLoadingGames && (
          <Spinner animation="grow" role="status" variant="success" />
        )}
        {!isLoadingGames && (
          <GamesListContainer>
            {games.map((game) => (
              <GameCard
                game={game}
                key={game.id}
                onClickJoin={this.handleJoinClicked}
              />
            ))}
          </GamesListContainer>
        )}
        <Modal
          isShowing={isPasswordModalShowing}
          title="Password?"
          submitText="Submit"
          onSubmit={this.handlePasswordSubmitted}
          onCancel={this.handleCancelJoiningGame}
          submitVariant="success"
          cancelVariant="success"
        >
          <PasswordInput
            value={passwordText}
            onChange={this.handlePasswordChanged}
            underlineColor={theme.GREEN_1}
          />
        </Modal>
      </>
    );
  }
}
