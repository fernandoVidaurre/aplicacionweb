import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder,AbstractControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  modalOpen: any;
  form: FormGroup = new FormGroup({});
  
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService
  ) { }
  
  showSuccess(message = "") {
    this.toastr.success(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  showError(message = "") {
    this.toastr.error(message, "",{
      progressBar: true,
      timeOut: 3000
    })
  }

  ngOnInit() {
    const themeToggle = document.getElementById('checkbox') as HTMLInputElement;
    themeToggle.addEventListener('change', () => this.toggleTheme());

    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      comensales: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    
    if (this.form.valid) {
      // Si todos los campos están llenos, cerrar el modal
      const detalleModal = document.getElementById('detalleModal');
      detalleModal?.classList.remove('show');
      const backdrop = document.querySelector('.modal-backdrop');
      backdrop?.parentNode?.removeChild(backdrop);
      this.form?.reset();
      this.showSuccess("Reservado con éxito");
   
    } else {
    
      this.showError('Por favor complete todos los campos correctamente');
    }
  }

  ngAfterViewInit(): void {
    const cancelButton = document.querySelector('.btn-cancelar');
    const detalleModal = document.getElementById('detalleModal');
    
    cancelButton?.addEventListener('click', () => {
      detalleModal?.classList.remove('show');
      const backdrop = document.querySelector('.modal-backdrop');
      backdrop?.parentNode?.removeChild(backdrop);
      this.form?.reset();
    });

   
  }
  toggleTheme() {
    console.log('Toggle theme function called');
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'oscuro' ? 'claro' : 'oscuro';
    root.setAttribute('data-theme', newTheme);

    // Cambia el estado del checkbox en función del tema
    const themeToggle = document.getElementById('themeToggle') as HTMLInputElement;
    themeToggle.checked = newTheme === 'oscuro';
  }

  getError(control: AbstractControl): void {
  console.log(control.errors?.['email'])

  if (!control) {
    return;
  }
  
  if (control.errors?.['email'] && control.touched){
    this.showError('Coloca un correo electronico válido')
    control.markAsUntouched();
  }
  return;
  
}

  customEmailValidator(control: AbstractControl) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    const value = control.value;
    if (!pattern.test(value) && control.touched)
      return {
        emailError: true
      };
    else return false;
  }
}

