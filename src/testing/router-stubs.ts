import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

// ActivatedRoute stub, form angular docs
@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;

  get testParamMap () {
    return this._testParamMap;
  }
  set testParamMap (params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  get snapshot () {
    return {
      paramMap: this.testParamMap
    };
  }
}
