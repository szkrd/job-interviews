import { escapeHtml } from './escapeHtml';

describe('escapeHtml', () => {
  it('should escape html special characters that would cause problems with innerHTML', () => {
    const userName = 'Hacker Harold\'"><h1 style="font-size:200px;color:red">';
    const escaped = escapeHtml(userName);
    expect(escaped).toBe('Hacker Harold&#039;&quot;&gt;&lt;h1 style=&quot;font-size:200px;color:red&quot;&gt;');
  });
});
