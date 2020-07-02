import React from 'react';
import styled from 'styled-components';
import Button from '../button';
import { ArrowRight, Lock, UserCheck, UserX } from 'react-feather';
import theme from '../../theme';

const StyledCard = styled.div`
  width: 180px;
  background-color: ${theme.GRAY_3};
  border-radius: 12px;
  padding: 12px;
  margin: 28px 42px;
  display: inline-block;
  box-shadow: 0 8px 10px ${theme.GRAY_5};
`;

const CardContent = styled.div`
  height: 120px;
  width: 100%;
`;

const GameName = styled.div`
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 32px;
  overflow: hidden;
  overflow-wrap: normal;
`;

const PlayerCountIcon = styled.div`
  vertical-align: middle;
  margin-right: 8px;
  display: inline;
`;

const JoinButton = styled(Button)`
  width: 100%;
`;

const Card = ({ game, onClickJoin }) => (
  <StyledCard>
    <CardContent>
      <GameName>{game.name}</GameName>
      <PlayerCountIcon>
        {game.players.length === game.config.maxPlayers ? (
          <UserX />
        ) : (
          <UserCheck />
        )}
      </PlayerCountIcon>
      {game.players.length} / {game.config.maxPlayers}
      <br />
      {game.config.roundCount} Round{game.config.roundCount !== 1 ? 's' : ''}
    </CardContent>
    <JoinButton onClick={() => onClickJoin(game)} variant="success">
      Join{' '}
      {game.config.isPrivate ? <Lock size="14" /> : <ArrowRight size="14" />}
    </JoinButton>
  </StyledCard>
);

export default Card;
