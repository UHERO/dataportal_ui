import { DataportalPage } from './app.po';

describe('dataportal App', function() {
  let page: DataportalPage;

  beforeEach(() => {
    page = new DataportalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
