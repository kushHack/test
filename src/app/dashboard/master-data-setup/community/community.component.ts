import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PaginationService } from 'src/app/shared/components/pagination/pagination.service';
import { ICommunity, IRpm } from 'src/app/shared/interfaces/community.model';
import { CommunityService } from 'src/app/shared/services/community.service';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})

export class CommunityComponent {
  public heading = 'Master Data Setup: Communities'
  public tableData?: ICommunity[];
  public tableHeading = ['#', 'Community ID', 'Community Name', 'Region', 'RPM', 'Fund', 'SQFT', 'Status', 'Action'];
  public filter = ''
  public form_method: string = 'create'
  public edit_community: any;
  public open_form: boolean = false;
  public tableLengthMin$ = this.paginationService.tableLengthMin;
  public tableLengthMax$ = this.paginationService.tableLengthMax


  constructor(
    private title: Title,
    private masterDataService: MasterDataService,
    private spinner: SpinnerService,
    private communityService: CommunityService,
    private paginationService: PaginationService
  ) {
    this.title.setTitle('Communities');
  }
  ngOnInit(): void {
    this.fetch_communities();
    this.fetchRpm();
  }

  fetch_communities() {
    this.masterDataService.getAllCommunities()
      .subscribe((response: any) => {
        this.spinner.change(false);
        this.open_form = false;
        if (response.code === 200) {
          this.tableData = response.data.map((element: any, index: number) => {
            element.index = index + 1;
            return element
          });
        }
        this.paginationService.tableLength.next(this.tableData!.length)
      })
  }



  fetchRpm() {
    this.communityService.getRPM().subscribe({
      next: (rpmList) => {
        this.communityService.rpmList.next(rpmList.data)
      }
    })
  }

  updateCommunity(community: any) {
    this.open_form = true;
    this.edit_community = community;
    this.form_method = 'update';
  }

  addCommunity() {
    this.form_method = 'create';
    this.open_form = true;
  }

  receiveFormData(data: any) {
    if (data.method === 'create') {
      this.masterDataService.addCommunity(data.form)
        .subscribe(response => {
          if (response.code === 200) {
            this.spinner.showAlert(response.message, "success")
            this.fetch_communities();
          }
        })
    }
    if (data.method === 'update') {
      this.masterDataService.updateCommunity(data.form)
        .subscribe(response => {
          if (response.code === 200) {
            this.spinner.showAlert(response.message, "success")
            this.fetch_communities();
          }
        })
    }
  }


}
