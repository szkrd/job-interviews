import { TestBed, getTestBed } from '@angular/core/testing';
import { RepoService } from './repo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_URL, REPO_ITEMS_PER_PAGE } from '../app.constants';

describe('RepoService', () => {
  let injector: TestBed;
  let repoService: RepoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    repoService = injector.get(RepoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repoService).toBeTruthy();
  });

  describe('search', () => {
    it('should search for repos and return the whole response', () => {
      const dummyResponse = { foo: 'bar' };
      const url = `${API_URL}/search/repositories
        ?q=foo
        &per_page=${REPO_ITEMS_PER_PAGE}
        &page=42
      `.replace(/\s/g, '');

      repoService.search('foo', 42).subscribe(response => {
        expect(response.body).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(dummyResponse);
    });
  });
});
