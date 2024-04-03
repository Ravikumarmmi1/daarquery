import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EntityconnectionService } from '../../services/entity/entityconnection.service';
import { QuerybuilderService } from '../../services/queryBuilder/querybuilder.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, ActivatedRoute, Params,RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-data-catlog',
  standalone: true,
  imports: [ NgxPaginationModule,RouterLink,RouterLinkActive],
  templateUrl: './data-catlog.component.html',
  styleUrl: './data-catlog.component.css'
})
export class DataCatlogComponent implements OnInit {
  queryData: any;
  searchdata: any = [];
  queryText = '';
  queryResponceData: any;
  qry: any; /* store only query for again call and save */
  entityContract: any;
  entityContractId:any="";
  status:boolean=false;


  maxSize: Number = 5;
  page = 1;
  itemsPerPage = 10;
  totalItems: any;
  querybuild: any;
  totalPages: any=[];
  singleData: any;
  @ViewChild('myModal', { static: true }) modal!: ElementRef<HTMLElement>;
  constructor(private entityconnectionService:EntityconnectionService,private querybuilderService:QuerybuilderService) { }

  

  ngOnInit(): void {
    this.getAllEntityContract();
    this.pageWiseQueryList(1);

  }

  pageWiseQueryList(page: any) {
    this.querybuilderService.getQueryList(page, this.itemsPerPage)
      .subscribe({
        next: (response: { status: number; pagination: { totalCount: any; totalPage: any }; data: any; message: any; }) => {
          if (response && response.status == 200) {
            this.totalItems = response.pagination.totalCount;
            this.queryData = response.data;
            this.searchdata = this.queryData;
          } else if (response && response.status) {
            this.searchdata = '';
          } else {
            console.log(response.message);
          }
        },
        error: (error:any) => {
            console.log('There was an error in retrieving data from the server');
        }
      });

    }

  getAllEntityContract(){
    this.entityconnectionService.getAllContract().subscribe((data: any)=>{
      this.entityContract = data.data;
    }) 
  }

  /* Entity Select Contract */
  getEntityContract(e: any){
    if(e.target.value){
      this.entityContractId=e.target.value;
    }else{
      this.entityContractId="";
    }
  }

    /* get single Query Info */
    // openModalForSingleQueryInfo(id: any) {
    //   this.querybuild.getSingleQueryInfo(id)
    //   .subscribe({
    //     next: (response: { status: number; data: any[]; message: any; }) => {
    //       if (response && response.status == 200) {
    //         this.modal.nativeElement.style.display = 'block';
    //         if(parseInt(response.data[0].status) == 0){this.status=true;}else{this.status=false;}
    //         this.qry = btoa(JSON.stringify(response.data[0]));
    //         this.queryResponceData = JSON.stringify(response.data[0], null, ' ');
    //       } else if (response && response.status) {
    //         this.modal.nativeElement.style.display = 'block';
    //         this.queryResponceData = JSON.stringify(response, null, ' ');
    //       } else {
    //         console.log(response.message);
    //       }
    //     },
    //     error: (error: any) => {
    //         console.log('There was an error in retrieving data from the server');
    //     }
    //   });
    // }


  /* get Query Responce */
  openModalForResponce(id: any) { 
    this.querybuild.getQueryResponce(id)
    .subscribe({
      next: (response: { data: { list: any; }[]; status: number; }) => {
        if (response && response?.data[0]?.list && response.status == 200) {
          this.qry='';
          this.modal.nativeElement.style.display = 'block';
          this.queryResponceData = JSON.stringify(response.data[0].list,null,' ');
        } else if (response && response.status == 204) {
          this.modal.nativeElement.style.display = 'block';
          this.queryResponceData = JSON.stringify(response, null, ' ');
        } else {
          console.log('Somthing went to wrong!.');
        }
      },
      error: (error: any) => {
          console.log('There was an error in retrieving data from the server');
      }
    });
  }

    /* Download SQL Query */
    downloadResponce() {
      const sqlContent = this.singleData;
      let blob = new Blob([sqlContent], { type: 'application/json' });
      const blobURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = blobURL;
      downloadLink.download = `${new Date().getTime()}.json`;
      downloadLink.click();
      URL.revokeObjectURL(blobURL);
    }


  keyup(value: string) {
    this.queryText = value;
    if (this.queryText.length > 0) {
      this.searchdata = this.queryData?.filter((queryList: any) => {
        return queryList.name?.includes(this.queryText);
      });
    } else {
      this.searchdata = this.queryData;
    }
  }
  

  openModal(data:any) {
    this.singleData=JSON.stringify(data,null, ' ');
    document.getElementById('editModal')?.classList.remove('displayNone');
    this.qry = btoa(JSON.stringify(data));

    if(data.status==0){
      this.status=true;
    }
    else{
      this.status=false;
    }
    }
    
    // Function to close modal
    closeModal() {
      document.getElementById('editModal')?.classList.add('displayNone')
    }

    refresh(){
     this.pageWiseQueryList(1);
    }
    
    ngOnDestroy() {
      this.searchdata = [];
      this.queryData = [];
      this.queryResponceData = '';
      this.queryText = '';
      this.qry = '';
      this.status=false;
    }
  }

    

