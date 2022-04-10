import { Footer } from 'antd/lib/layout/layout';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { famousQuotes } from '../data/famousQuotes';
import { styles, style as st } from '../utils/css';
import { random } from '../utils/number';

export default function AppFooter() {
  const quote = famousQuotes[random(famousQuotes.length - 1)];
  return (
    <Footer style={styles(st.italic, st.textRight, st.bgIndigo200)}>
      <Text>{quote.text}</Text> <Text type="secondary">{quote.author}</Text>
    </Footer>
  );
}
