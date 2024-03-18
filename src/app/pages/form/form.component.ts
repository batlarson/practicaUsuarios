import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    this.usuariosForm = new FormGroup({}, []);
  }

  //   async getDataForm() {
  //     //Actualizar:
  //     if (this.usuariosForm.value._id) {
  //       const response = await this.usuariosForm.update(this.usuariosForm.value);
  //       if (response.id) {
  //         alert(`La serie ${response.title} se ha actualizado correctamente`);
  //         this.router.navigate(['/series']);
  //       } else {
  //         alert('Ha habido un problema, intentalo de nuevo');
  //       }
  //     } else {
  //       //inyectar el servicio para hacer la funcion de crear una serie pasandole los datos del formulario y esperar una respuesta
  //       //si la serie se inserta correctamente, que me mande a la vista de series
  //       const response = await this.seriesServices.insert(this.seriesForm.value);
  //       if (response.id) {
  //         //insertado correctamente, habria que redireccionar a la lista de series pero va a hacer alerta
  //         alert(`La serie ${response.title} se ha añadido correctamente`);
  //         this.router.navigate(['/series']);
  //       } else {
  //         alert('Ha habido un problema, intentalo de nuevo');
  //       }
  //     }
  //   }
}
