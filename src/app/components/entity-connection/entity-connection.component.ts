import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { EntityconnectionService } from '../../services/entity/entityconnection.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-entity-connection',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './entity-connection.component.html',
  styleUrl: './entity-connection.component.css'
})
export class EntityConnectionComponent implements OnInit{
  toggle: boolean=false;
  singleData:any;
  form!: FormGroup;
  storage: Array<any> =['DB','S3'];
  entity: any;
  updateEntity: any={};
  updateEntityId:any;
  entityId:any="";
  entityType:any=[];
  modelLabel:String= "Create New Entity Connection";
  @ViewChild('myModal', { static: true }) modal!: ElementRef<HTMLElement>;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  
  constructor(private entityconnectionService:EntityconnectionService,private router: Router) {}
  ngOnInit(): void {
    this.getAllEntity();
    this.form = new FormGroup({
      entity: new FormControl('', [Validators.required]),
      entityId: new FormControl(''),
      entityType: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      entityName: new FormControl('', [Validators.required]),
      entityUrl: new FormControl('', [Validators.required]),
      entityRole: new FormControl('', [Validators.required]),
      projectName: new FormControl('', [Validators.required]),
      user: new FormControl(null),
      password: new FormControl(null),
      method: new FormControl(null),
      isActive: new FormControl(true),
    });
  }
  
// Function to open modal
 openModal() {
  this.updateEntity={};
document.getElementById('exampleModal')?.classList.remove('displayNone');


}
viewModel(data:any){
  this.singleData=JSON.stringify(data,null, ' ');
  document.getElementById('editModal')?.classList.remove('displayNone');
}
  // Function to close modal
  closeModal2() {
    document.getElementById('editModal')?.classList.add('displayNone')
  }

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


// Function to close modal
 closeModal() {
  this.router.navigate([],{queryParams: {id: null},queryParamsHandling: 'merge'});
  document.getElementById('exampleModal')?.classList.add('displayNone')
  
}

openActionDropdown() {
  this.toggle = !this.toggle
  if(this.toggle){
    document.getElementById('dropDown')?.classList.remove('displayNone')
  }
  else{
    document.getElementById('dropDown')?.classList.add('displayNone')
  }
}
get f(){
  return this.form.controls;
}


getAllEntity(){
  this.entityconnectionService.getAllEntity().subscribe((data: any)=>{
    this.entity = data.data;
    /* get id from url and fill model */
    this.activeRoute.queryParamMap.subscribe((queries) => {
      if(queries.get('id')){
        this.updateEntityId=queries.get('id');
        this.modelLabel= "Update Entity Connection";
        this.openModal();
        if(this.entity){
          this.updateEntity = this.entity.filter((item: any) => item._id == this.updateEntityId);
          this.updateEntity=this.updateEntity[0];
        }
      }
    })

  }) 

}

getEntity(e: any){
  if(e.target.value){
    this.entityId=e.target.value;
  }else{
    this.entityId="";
  }
  if(this.entityId == "DB"){
    this.entityType=[{"name":"MONGO","id":3},{"name":"MYSQL","id":4},{"name":"POSTGRES","id":5}]
  }else{
    this.entityType=[{"name":"CSV","id":0},{"name":"PARQUET","id":1},{"name":"JSON","id":2}]
  }
}

getEntityType(e: any){
  if(e.target.value){
    // this.entityId=e.target.value;
  }
}



  /* Entity save & update */
  save_updateEntity(){
    /* entity update */
    if(this.updateEntity && this.updateEntityId){
      this.entityconnectionService.updateEntity(this.updateEntity,this.updateEntityId).subscribe({
        next: (response)=>{
          if(response && response.status == 202){
            alert(response.message);
            this.getAllEntity();
            this.form.reset();
            this.updateEntity={};
            this.closeModal();
          }else if(response && response.status){
            console.log(response.message);
            this.closeModal(); 
          }
        },
        error: (error) => {
          console.log(error.error.message);
        }
      });
    }else{
      /* entity create */
      /* console.log(this.form.value); */
      this.entityconnectionService.saveEntity(this.form.value).subscribe({
        next: (response)=>{
          if(response && response.status == 201){
            alert(response.message);
            this.getAllEntity();
            this.closeModal();
            this.form.reset();
            
     
          }else if(response && response.status){
            this.closeModal();
            console.log(response.message);
          }
        },
        error: (error) => {
            console.log(error.error.message);
        }
      });
    }
  }

    /* Entity delete */
    deleteEntity(id:number){
      this.entityconnectionService.delete(id).subscribe(
        {
          next: (response:any)=>{
            if(response && response.status == 200){
              this.entity = this.entity.filter((item: any) => item._id !== id);
              console.log(response.message);
            }else if(response && response.status != 200){
              console.log(response.message);
            }
          },
          error: (error) => {
              console.log('There was an error in retrieving data from the server');
          }
        });
    }

    ngOnDestroy(){
      this.entity='';
      this.updateEntity={};
      this.updateEntityId='';
      this.modelLabel= "Create New Entity Connection";
      this.form.reset();
    }
  


}