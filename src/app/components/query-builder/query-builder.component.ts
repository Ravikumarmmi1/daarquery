import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { QuerybuilderService } from '../../services/queryBuilder/querybuilder.service';
import { EntityconnectionService } from '../../services/entity/entityconnection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var NodeSQLParser: any;
declare var fetch: any;
@Component({
  selector: 'app-query-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './query-builder.component.html',
  styleUrl: './query-builder.component.css',
})
export class QueryBuilderComponent implements OnInit {

  toggle: boolean = false;
  rawSQL: any = '';
  SQLHighlighted: any = '';
  errorMessage: any = '';
  isError: Boolean = false;
  isErrorMessage: any = '';
  isResponse: Boolean = false;
  isResponseMessage: any = '';
  savequery: any;
  uName: any;
  schedule: Boolean = true;
  queryName: any = '';
  updateButton: boolean = false;
  urlData: any = '';
  timestamp: any = new Date().getTime() / 1000;
  selectedProject: any;
  @ViewChild('myModal', { static: true }) modal!: ElementRef<HTMLElement>;

  /* @ViewChild('queryName', {static: true}) queryName!: ElementRef<HTMLElement>; */
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  entityContract: any;
  entityContractId: any = '';
  epochDate:number=0;

  constructor(
    private router: Router,
    private querybuilderService: QuerybuilderService,
    private entityconnectionService: EntityconnectionService
  ) {
    this.uName = localStorage.getItem('_userName');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.activeRoute.queryParamMap.subscribe((queries) => {
        if (queries.get('query')) {
          this.updateButton = true;
          this.urlData = queries.get('query');
          this.urlData = JSON.parse(atob(this.urlData));
          this.rawSQL = this.urlData?.query;
          this.queryName = this.urlData?.name;
          this.entityContractId = this.urlData?.contractId;
          this.schedule = this.urlData?.isSchedule;
          this.timestamp = this.urlData?.timestamp;
        } else {
          this.ngOnDestroy();
        }
      });
    }, 0);
  }
  epochTodate(epoch: any) {
    const date = new Date(epoch * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Format month with leading zero
    const day = String(date.getDate()).padStart(2, '0'); // Format day with leading zero
    const time =
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}\T${time}`;
  }
  ngOnInit() {
    this.getAllEntityContract();
    let inputref: any = document.getElementsByClassName('input-sql');
    var qc = this;
    inputref[0]?.addEventListener('change', function () {
      // Get the selected file
      const selectedFile = inputref[0].files[0];
      if (selectedFile) {
        // Create a FileReader
        const reader = new FileReader();
        // Add an event listener to handle when the file is loaded
        reader.onload = function (e: any) {
          try {
            /* let parser = new NodeSQLParser.Parser();
          let ast = parser.astify(e.target.result);
          let sql = parser.sqlify(ast); */
            qc.rawSQL = e.target.result;
            qc.SQLHighlighted = e.target.result;
            qc.isResponse = false;
            qc.isResponseMessage = '';
          } catch (error: any) {
            qc.isError = true;
            qc.isErrorMessage = error.name + ' : ' + error.message;
            qc.isResponse = false;
            qc.isResponseMessage = '';
            console.log('error', error);
          }
        };
        // Read the file as text
        reader.readAsText(selectedFile);
      }
    });


  }

  /* Entity Contract get */
  getAllEntityContract() {
    this.entityconnectionService.getAllContract().subscribe((data: any) => {
      this.entityContract = data.data;
    });
  }

  /* Entity Select Contract */
  getEntityContract(e: any) {
    if (e.target.value) {
      this.entityContractId = e.target.value;
    } else {
      this.entityContractId = '';
    }
  }

  onSubmitRawSQL() {
    try {
      this.isErrorMessage = '';
      this.isError = false;
      if (this.rawSQL.includes('mmi_lms')) {
        this.SQLHighlighted = this.rawSQL;
        this.isError = false;
        /* const parser = new NodeSQLParser.Parser();
        const ast = parser.astify(this.SQLHighlighted);
        parser.sqlify(ast); */
      } else {
        this.SQLHighlighted = '';
        this.isError = true;
        this.isErrorMessage = 'Plesae use table Name (mmi_lms)';
      }
    } catch (error: any) {
      this.SQLHighlighted = '';
      this.isError = true;
      this.isErrorMessage = error.name + ' : ' + error.message;
    }
    this.isResponse = false;
    this.isResponseMessage = '';
  }

  downloadSQL() {
    const sqlContent = this.rawSQL;
    let blob = new Blob([sqlContent], { type: 'application/sql' });
    const blobURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobURL;
    downloadLink.download = `${new Date().getTime()}.sql`;
    downloadLink.click();
    URL.revokeObjectURL(blobURL);
  }

  /* Save Query */
  saveQuery() {
    if (this.rawSQL && this.uName && this.queryName && this.entityContractId) {
      this.savequery = {
        query: this.rawSQL,
        name: this.queryName,
        isSchedule: this.schedule ? this.schedule : true,
        contractId: this.entityContractId,
      };
      if (this.savequery.isSchedule == true) {
        if (
          this.epochDate
        ) {
          this.savequery['timestamp'] =
            this.epochDate;
        } else {
          console.log('Please Select Data & Time!.');
          this.isErrorMessage = 'Please Select Data & Time!.';
          return;
        }
        if (new Date().getTime() / 1000 > this.savequery['timestamp']) {
          console.log('Please Select > current Date & Time!.');
          this.isErrorMessage = 'Schedule Date is less than current Date!.';
          return;
        }
      }
   
      this.querybuilderService.saveQuery(this.savequery).subscribe({
        next: (response) => {
       window.alert(response.data.msg);
      this.closeModal();
      this.ngOnInit();
  
          if (response && response.status == 201) {
            this.openModal(response.data.msg);
            setTimeout(() => {
              this.close();
            }, 3000);
          } else if (response && response.status) {
            this.openModal(response.data.msg);
          }
        },
        error: (error) => {
          console.log('There was an error in retrieving data from the server');
          this.openModal(
            'There was an error in retrieving data from the server'
          );
          setTimeout(() => {
            this.close();
          }, 3000);
        },
      });
    } else {
      this.openModal('Project Name,Query Name and Query Required!');
    }
  }

  executeQuery() {
    if(!this.queryName){
      window.alert('Please Enter Query Name');
      return
    }
    if(!this.entityContractId){
      window.alert('Please Select Project Name');
      return
    }
   
    if (this.rawSQL && this.queryName && this.entityContractId) {
      this.savequery = {
        query: this.rawSQL,
        name: this.queryName,
        isSchedule: false,
        contractId: this.entityContractId,
      };
      

      this.querybuilderService.saveQuery(this.savequery).subscribe({
        next: (response) => {
          if (response && response.status == 201) {
            this.isResponse = true;
            this.isResponseMessage = JSON.stringify(response, null, ' ');
          } else {
            this.isResponse = false;
            this.isResponseMessage = '';
            this.isError = true;
            this.isErrorMessage =
              'Please Check Yor Query and Query Schema or maybe Server is not running!.';
            return;
          }
        },
        error: (error) => {
          console.log('There was an error in retrieving data from the server');
          this.openModal(
            'There was an error in retrieving data from the server'
          );
        },
      });
    } else {
      this.openModal('Project Name,Query Name and Query Required!');
    }
  }

  updateQuery() {
    if (this.rawSQL && this.uName && this.queryName && this.urlData._id) {
      this.savequery = {
        query: this.rawSQL,
        name: this.queryName,
        isSchedule: this.schedule ? this.schedule : true,
      };

      if (this.savequery.isSchedule == true) {
        /* if(this.timestamp){this.savequery['timestamp']=this.timestamp;} */
        if (
          this.epochDate
        ) {
          this.savequery['timestamp'] =
            this.epochDate;
        } else {
          console.log('Please Select Data & Time!.');
          this.openModal('Please Select Data & Time!.');
          setTimeout(() => {
            this.close();
          }, 2000);
          return;
        }
        if (new Date().getTime() / 1000 > this.savequery['timestamp']) {
          console.log('Please Select > current Date & Time!.');
          this.openModal('Please Select > current Date & Time!.');
          setTimeout(() => {
            this.close();
          }, 2000);
          /* this.timestamp=''; */
          return;
        }
      }
      this.querybuilderService
        .updateQuery(this.savequery, this.urlData._id)
        .subscribe({
          next: (response) => {
            window.alert(response.data.msg);
            this.closeModal();

            if (response && response.status == 201) {
              this.openModal(response.message);
              setTimeout(() => {
                this.close();
                this.router.navigate([], {
                  queryParams: { query: null },
                  queryParamsHandling: 'merge',
                });
              }, 2000);
              /* this.loaderService.hide(); */
            } else if (response && response.status) {
              this.openModal(response.message);
              setTimeout(() => {
                this.close();
              }, 3000);
              /* this.loaderService.hide(); */
            }
          },
          error: (error) => {
            console.log(
              'There was an error in retrieving data from the server'
            );
            this.openModal(
              'There was an error in retrieving data from the server'
            );
            setTimeout(() => {
              this.close();
            }, 3000);
          },
        });
    } else {
      this.isErrorMessage = 'Query Name and Query Required!';
    }
  }

  /* Load SQL */
  handleInput(e: any) {
    let inputref: any = document.getElementsByClassName('input-sql');
    inputref[0]?.click();
  }

  openActionDropdown() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      document.getElementById('dropDown')?.classList.remove('displayNone');
    } else {
      document.getElementById('dropDown')?.classList.add('displayNone');
    }
  }
  openModal(message: any) {
    if (message) {
      this.isErrorMessage = message;
    } else {
      this.isError = false;
      this.isErrorMessage = '';
    }
    // this.modal.nativeElement.style.display = 'block';
  }
  close() {
    this.isErrorMessage = '';
    // this.modal.nativeElement.style.display = 'none';
  }

  openModal1() {
    document.getElementById('exampleModal')?.classList.remove('displayNone');
  }

  // Function to close modal
  closeModal() {
    document.getElementById('exampleModal')?.classList.add('displayNone');
    this.router.navigate([],{queryParams: {query: null},queryParamsHandling: 'merge'});


  }

  dateToEpoch(date: any) {
 const epoch=new Date(date).getTime()/1000;
//  this.epochTodate(epoch);
this.epochDate=epoch
// this.remainingTime(epoch);

  }
input(e:any){
  this.dateToEpoch(e.target.value);

}
handleFileInput(e: any) {
  let reader = new FileReader();
  reader.readAsText(e.target.files[0]);
  reader.onload = () => {
    this.rawSQL = reader.result;
  };
}

// remainingTime( date: any) {
// setInterval(() => {
//   let timeNow=new Date().getTime()/1000
//   console.log(timeNow);
//   let timeLeft=date-timeNow
//   console.log(timeLeft);
  
//  let minutes=Math.floor(timeLeft/60)
//  let seconds=timeLeft-minutes*60
//  console.log(`${minutes}:${seconds}`);
// }, 1000);
// }

  ngOnDestroy() {
    this.savequery = {};
    this.rawSQL = '';
    this.queryName = '';
    this.SQLHighlighted = '';
    this.errorMessage = '';
    this.isError = false;
    this.isErrorMessage = '';
    this.isResponse = false;
    this.isResponseMessage = '';
    this.schedule = true;
    this.updateButton = false;
    this.timestamp = new Date().getTime() / 1000;
    this.urlData = '';
    this.entityContract = '';
    this.entityContractId = '';
  }
}
