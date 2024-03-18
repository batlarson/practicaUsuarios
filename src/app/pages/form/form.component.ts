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
  usuariosForm: FormGroup;
  usuariosService = inject(UsuariosService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.usuariosForm = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', []),
        email: new FormControl('', []),
        imagen: new FormControl('', []),
      },
      []
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.tipo = 'ACTUALIZAR';
        //para actualizar necesitamos pedir los datos:
        const response = await this.usuariosService.getById(params.id);
        //para llenar el formulario hay dos opciones, la opcion 1:
        //this.seriesForm.setValue(response) --> El problema de esta es que deberiamos tener el formulario totalmente completo para recibir la respuesta completa (añadir id y _id)
        //la opcion 2, y la mejor:
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
    //Actualizar:
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
      //inyectar el servicio para hacer la funcion de crear una serie pasandole los datos del formulario y esperar una respuesta
      //si la serie se inserta correctamente, que me mande a la vista de series
      const response = await this.usuariosService.insert(
        this.usuariosForm.value
      );
      if (response.id) {
        //insertado correctamente, habria que redireccionar a la lista de series pero va a hacer alerta
        alert(`El usuario ${response.username} se ha añadido correctamente`);
        this.router.navigate(['/home']);
      } else {
        alert('Ha habido un problema, intentalo de nuevo');
      }
    }
  }
}
