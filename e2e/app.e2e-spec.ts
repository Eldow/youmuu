import { YoumuuPage } from './app.po';

describe('youmuu App', () => {
  let page: YoumuuPage;

  beforeEach(() => {
    page = new YoumuuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
