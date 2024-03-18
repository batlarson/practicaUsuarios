import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { UsersListComponent } from '../../pages/users-list/users-list.component';

@Component({
  selector: 'app-iconos-users',
  standalone: true,
  imports: [RouterLink, UsersListComponent],
  templateUrl: './iconos-users.component.html',
  styleUrl: './iconos-users.component.css',
})
export class IconosUsersComponent {
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
