
import { Pipe } from '@angular/core';

@Pipe({
  name: 'capital'
})
export class CapitalPipe  {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
