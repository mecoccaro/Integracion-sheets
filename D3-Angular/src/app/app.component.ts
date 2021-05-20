import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D3-Angular';
  waterfalData=[
    {
        "name": "FY16 Value",
        "value": 147.0,
        "class": "total",
        "start": 0
    },
    {
        "name": "Acct Planning",
        "value": 148.4
    },
    {
        "name": "Global Accomodations",
        "value": 151.7
    },
    {
        "name": "MKT Funding",
        "value": 151.7
    },
    {
        "name": "Price",
        "value": 151.7
    },
    {
        "name": "Customer Analytics",
        "value": 161.7
    },
    {
        "name": "Digital Templates",
        "value": 161.7
    },
    {
        "name": "FY17 Value",
        "value": 161.7,
        "class": "total",
        "start": 0
    }
];
}
