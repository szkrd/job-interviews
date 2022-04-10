import { Footer } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { style } from '../utils/css';
import { random } from '../utils/number';

interface IFamousQuote {
  text: string;
  author: string;
}

const quotes: IFamousQuote[] = [
  {
    text: 'If you want a happy ending, that depends, of course, on where you stop your story.',
    author: 'Orson Welles',
  },
  { text: 'Cinema is the most beautiful fraud in the world.', author: 'Jean-Luc Godard' },
  {
    text: 'The sound and music are 50% of the entertainment in a movie.',
    author: 'George Lucas',
  },
  {
    text: "Cinema is a matter of what's in the frame and what's out.",
    author: 'Martin Scorsese',
  },
  {
    text: 'The length of a film should be directly related to the endurance of the human bladder.',
    author: 'Alfred Hitchcock',
  },
  { text: 'Movies are like an expensive form of therapy for me.', author: 'Tim Burton' },
  {
    text: 'Cinema should make you forget you are sitting in a theater.',
    author: 'Roman Polanski',
  },
  {
    text: "The difference between life and the movies is that a script has to make sense, and life doesn't.",
    author: 'Joseph L. Mankiewicz',
  },
  { text: 'Film lovers are sick people.', author: 'Francois Truffaut' },
];

export default function AppFooter() {
  const quote = quotes[random(quotes.length)];
  return (
    <Footer style={{ ...style.italic, ...style.textRight }}>
      <Text>{quote.text}</Text> <Text type="secondary">{quote.author}</Text>
    </Footer>
  );
}
