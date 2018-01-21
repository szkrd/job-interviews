import { TestBed, getTestBed } from '@angular/core/testing';
import { IssueService } from './issue.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL, ISSUE_ITEMS_PER_PAGE } from '../app.constants';

describe('IssueService', () => {
  let injector: TestBed;
  let issueService: IssueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    issueService = injector.get(IssueService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(issueService).toBeTruthy();
  });

  describe('search', () => {
    it('should search for issues and return the whole response', () => {
      const url = `${API_URL}/repos/foo/issues
        ?page=2
        &per_page=${ISSUE_ITEMS_PER_PAGE}
        &state=open
        &sort=created
        &order=desc
      `.replace(/\s/g, '');
      const dummyResponse = { foo: 'bar' };

      issueService.search('foo', 2).subscribe(response => {
        expect(response.body).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyResponse);
    });
  });
});
