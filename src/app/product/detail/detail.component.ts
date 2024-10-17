import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, takeUntil } from 'rxjs';
import { ApiService } from '../../api.service';

export const APP_SOME_ID = new InjectionToken<Observable<string>>(
  'stream of id from route param',
);

export const URL_TOKEN = new InjectionToken<string>('')


export function routeParamFactory(
  paramKey: string
): (route: ActivatedRoute) => Observable<string | null> {
  return (route: ActivatedRoute): Observable<string | null> => {
    return route.paramMap.pipe(map(param => param.get(paramKey)));
  };
}

export function getUrl(api: ApiService) {
  return api.url()
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  providers: [
    {
      provide: APP_SOME_ID,
      useFactory: routeParamFactory('id'),
      deps: [ActivatedRoute]
    },
  ]
})
export class DetailComponent implements OnInit {
  constructor(
    @Inject(APP_SOME_ID)
    private readonly id$: Observable<string>,
    @Inject(URL_TOKEN)
    private readonly url$: string,
  ) {}

  ngOnInit(): void {
    console.log(this.url$)
  }
}
