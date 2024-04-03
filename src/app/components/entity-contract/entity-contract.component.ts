import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { EntityconnectionService } from '../../services/entity/entityconnection.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-entity-contract',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './entity-contract.component.html',
  styleUrl: './entity-contract.component.css',
})
export class EntityContractComponent implements OnInit {
  constructor(private entityconnectionService: EntityconnectionService) {}
  toggle: boolean = false;
  form!: FormGroup;
  entity: any;
  entityContract: any;
  updateEntityContract: any = {};
  @ViewChild('myModal', { static: true }) modal!: ElementRef<HTMLElement>;
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getAllEntityContract();
    this.form = new FormGroup({
      primaryInput: new FormControl('', [Validators.required]),
      primaryOutput: new FormControl('', [Validators.required]),
      /*  dataContract: new FormControl('', [Validators.required]), */
      projectName: new FormControl('null', [Validators.required]),
    });
    this.getAllEntity();
  }

  get f() {
    return this.form.controls;
  }

  /* Entity get */
  getAllEntity() {
    this.entityconnectionService.getAllEntity().subscribe((data: any) => {
      this.entity = data.data;
    });
  }

  saveEntityContract() {
    this.form.value['projectName'] = this.entity[0]?.projectName;
    this.entityconnectionService.saveEntityContract(this.form.value).subscribe({
      next: (response) => {
        if (response && response.status == 201) {
          this.getAllEntityContract();
          this.form.reset();
          this.closeModal();
          this.ngOnInit();
        } else if (response && response.status) {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  /* Entity delete */
  deleteEntityContract(id: number) {
    this.entityconnectionService.deleteContract(id).subscribe({
      next: (response: any) => {
        if (response && response.status == 200) {
          this.entityContract = this.entityContract.filter(
            (item: any) => item._id !== id
          );
        } else if (response && response.status != 200) {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  openModal() {
    this.updateEntityContract = {};
    document.getElementById('exampleModal')?.classList.remove('displayNone');
  }

  // Function to close modal
  closeModal() {
    document.getElementById('exampleModal')?.classList.add('displayNone');
    // this.form.reset();
  }

  openActionDropdown() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      document
        .getElementById('actionDropdown')
        ?.classList.remove('displayNone');
    } else {
      document.getElementById('actionDropdown')?.classList.add('displayNone');
    }
  }

  getAllEntityContract() {
    this.entityconnectionService.getAllContract().subscribe((data: any) => {
      this.entityContract = data.data;
    });
  }

  ngOnDestroy() {
    this.form.reset();
  }

  /////
  toggleDropdown(): void {
    this.toggle = !this.toggle;
  }
}
