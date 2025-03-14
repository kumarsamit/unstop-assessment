import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDataService } from '../user-service/user-data.service';
import { MatTable } from '@angular/material/table';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  displayedColumns: string[] = ['name', 'email', 'role'];
  usersList: any = [];
  filteredUsersList: any = [];
  loader: boolean = false;
  pieChartData!: ChartData<'pie'>;
  pieChartOptions!: ChartOptions<'pie'>;
  pieChartType: ChartType = 'pie';
  countObj: any = '';


  constructor(
    private _dialog: MatDialog,
    public _userDataService: UserDataService,
  ) {
    this._userDataService.userData$.subscribe((data) => {
      if (data) {
        this.loader = true;
        setTimeout(() => {
          this.loader = false
        }, 300)
      }
      this.usersList = data;
      this.filteredUsersList = data;
      this.getUserCount(this.usersList)
      this.table?.renderRows();
    });
  }

  getUserCount(userList: Array<{ role: string }>) {
    this.countObj = {};
    userList.forEach((item) => {
      if (this.countObj.hasOwnProperty(item.role)) {
        this.countObj[item.role] += 1;
      } else {
        this.countObj[item.role] = 1;
      }
    });
    if(!this.chart) return
    this.pieChartData.datasets[0].data = [this.countObj.Admin, this.countObj.Editor, this.countObj.Viewer]
    this.chart?.update();
  }


  searchUsers(event: string) {
    if (!event.trim()) {
      this.filteredUsersList = [...this.usersList];
      return;
    }
    this.filteredUsersList = this.usersList.filter((user: any) =>
      user.name.toLowerCase().includes(event.trim().toLowerCase())
    );
  }

  async addUserPopup() {
    const module = await import('../user-form/user-form.component');
    const userFormComponent = module.UserFormComponent;
    this._dialog.open(userFormComponent, {
      width: '500px',
      data: '',
    });
  }

  async ngAfterViewInit() {
    setTimeout(async () => {
      const { Chart } = await import('chart.js');

      this.pieChartData = {
        labels: ['Admin', 'Editor', 'Viewer',],
        datasets: [
          {
            data: [this.countObj.Admin, this.countObj.Editor, this.countObj.Viewer],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 2,
          },
        ],
      };

      this.pieChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    }, 0);

  }











}
