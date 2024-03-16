import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users:any[], term:string): any[] {
    return users.filter((user)=>user.name.toLowerCase().includes(term.toLowerCase()));
  }

}
