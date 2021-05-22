export class Route {
    constructor(public name: string, public distance: number, public temperature: number, public avgSpeed: number, public points: PointCity[], public correct: number) {}
  }

export class PointCity {
  constructor(public name: string, public direction: number, public windDirection: number, public windSpeed: number, public correct: number, public comeBack: boolean, public lat: number, public lon: number) {}
}