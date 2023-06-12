import { Injectable } from '@angular/core';

export class Group {
   level: number = 0;
   parent: Group;
   expanded: boolean = true;
   get visible(): boolean {
      return !this.parent || (this.parent.visible && this.parent.expanded);
   }
}
@Injectable({
   providedIn: 'root'
})
export class GroupTableService {

   // first
   dataSource
   groupByColumns: string[]

   customFilterPredicate(data: any | Group, filter: string): boolean {
      return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
   }

   getDataRowVisible(data: any): boolean {
      const groupRows = this.dataSource.data.filter(
         row => {
            if (!(row instanceof Group)) return false;
            let match = true;
            this.groupByColumns.forEach(
               column => {
                  if (!row[column] || !data[column] || row[column] !== data[column]) match = false;
               }
            );
            return match;
         }
      );
      if (groupRows.length === 0) return true;
      if (groupRows.length > 1) throw "Data row is in more than one group!";
      const parent = <Group>groupRows[0];  // </Group> (Fix syntax coloring)
      return parent.visible && parent.expanded;
   }

   groupHeaderClick(row) {
      row.expanded = true
      this.dataSource.filter = performance.now().toString();  // hack to trigger filter refresh
   }

   addGroups(data: any[], groupByColumns: string[]): any[] {
      var rootGroup = new Group();
      // console.log('sub ', this.getSublevel(data, 0, groupByColumns, rootGroup))
      return this.getSublevel(data, 0, groupByColumns, rootGroup);
   }

   getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
      // Recursive function, stop when there are no more levels. 
      if (level >= groupByColumns.length)
         return data;
      var groups = this.uniqueBy(
         data.map(
            row => {
               var result = new Group();
               result.level = level + 1;
               result.parent = parent;
               for (var i = 0; i <= level; i++)
                  result[groupByColumns[i]] = row[groupByColumns[i]];
               return result;
            }
         ),
         JSON.stringify
      );
      const currentColumn = groupByColumns[level];
      var subGroups = [];
      groups.forEach(group => {
         let rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn])
         let subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
         subGroup.unshift(group);
         subGroups = subGroups.concat(subGroup);
      })
      return subGroups;
   }

   uniqueBy(a, key) {
      var seen = {};
      return a.filter(function (item) {
         var k = key(item);
         return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      })
   }

   isGroup(index, item): boolean {
      return item.level;
   }
   getTotalCost(data, groupBy: string[]) {
      // let getData = this.addGroups(data, groupBy)
      // // return console.log(data.map(t => t.salary).reduce((acc, value) => acc + value, 0))
      // // return getData.map(t => t.salary).reduce((acc, value) => acc + value, 0);
      // console.log(getData)
   }
}
