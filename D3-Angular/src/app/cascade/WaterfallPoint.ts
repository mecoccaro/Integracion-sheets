export class waterfallpoint {

      private p_start:number = 0;
      private p_value:number = 0;

      public prev_name:string;
      public value:number = 0
      public name: string;
      public isTotal:boolean = false;

      constructor(val:number, name:string, prevobj:waterfallpoint = null) {
        this.value = val;
        this.name =this.prev_name = name;
        if (prevobj) {
          // we need to know about the previous object so we can connect and
          // for non-total bars this determines the lower cutoff of the bar
          this.p_start = prevobj.start();
          this.p_value = prevobj.value;
          this.prev_name = prevobj.name;
        }
      }

      public CssClass() {
        if (!this.isTotal) {
          return (this.value >= 0 ) ? 'positive' : 'negative';
        }
        // totals hvae their own class
        return "total";
      }

      public start() {
        // Want 0 for total bars and previous values for others
        if (!this.isTotal) {
          return this.p_value;
        }
        return 0;
      }

      public diff() {
        if (this.isTotal) {
          return this.value;
        }
        // only want a diff value if its not a total bar
        return this.value - this.start();
      }

      public Max() {
        // will be the value for the last bar or the start
        return Math.max(this.start(), this.value);
      }

      public prevMax() {
        // should be 0 for the first bar with no previous
        return Math.max(this.p_start, this.p_value)
      }

    }
