import { Component, Input, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';
import { UserViewComponent } from '../../pages/user-view/user-view.component';

@Component({
  selector: 'app-botones-user',
  standalone: true,
  imports: [RouterLink, UserViewComponent],
  templateUrl: './botones-user.component.html',
  styleUrl: './botones-user.component.css',
})
export class BotonesUserComponent {
  @Input() idUsuario: string | undefined = '';
  usuariosService = inject(UsuariosService);

  async borrarUsuario(id: string | undefined) {
    if (id !== undefined) {
      let confirmacion = confirm(
        'Seguro que quieres borrar el usuario con id ' + this.idUsuario
      );
      if (confirmacion) {
        let response = await this.usuariosService.delete(id);
        if (response.id) {
          alert('Se ha borrado correctamente el usuario ' + response._id);
        }
      }
    }
  }
}
