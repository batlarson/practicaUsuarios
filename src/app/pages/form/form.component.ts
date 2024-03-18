import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  tipo: string = 'NUEVO';
  inputValue: string = 'Guardar';
  usuariosForm: FormGroup;
  usuariosService = inject(UsuariosService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.usuariosForm = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        apellido: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
        imagen: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/
          ),
        ]),
      },
      []
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'ACTUALIZAR';
        this.inputValue = 'Actualizar';

        const response = await this.usuariosService.getById(params.id);

        this.usuariosForm = new FormGroup(
          {
            _id: new FormControl(response._id, []),
            id: new FormControl(response.id, []),
            nombre: new FormControl(response.first_name, []),
            apellido: new FormControl(response.last_name, []),
            username: new FormControl(response.username, []),
            email: new FormControl(response.email, []),
            imagen: new FormControl(response.image, []),
          },
          []
        );
      }
    });
  }

  async getDataForm() {
    if (this.usuariosForm.value._id) {
      const response = await this.usuariosService.update(
        this.usuariosForm.value
      );
      if (response.id) {
        alert(
          `El usuario ${response.username} se ha actualizado correctamente`
        );
        this.router.navigate(['/home']);
      } else {
        alert('Ha habido un problema, intentalo de nuevo');
      }
    } else {
      const response = await this.usuariosService.insert(
        this.usuariosForm.value
      );
      if (response.id) {
        alert(`El nuevo usuario se ha añadido correctamente`);
        this.router.navigate(['/home']);
      } else {
        alert('Ha habido un problema, intentalo de nuevo');
      }
    }
  }

  checkControl(
    FormControlName: string,
    validador: string
  ): boolean | undefined {
    return (
      this.usuariosForm.get(FormControlName)?.hasError(validador) &&
      this.usuariosForm.get(FormControlName)?.touched
    );
  }
}
