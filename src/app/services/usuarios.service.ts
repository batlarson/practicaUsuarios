import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  httpClient = inject(HttpClient);
  linkUsuarios = 'https://peticiones.online/api/users';

  getAll(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.linkUsuarios));
  }

  getById(_id: string): Promise<IUsuario> {
    return lastValueFrom(
      this.httpClient.get<IUsuario>(`${this.linkUsuarios}/${_id}`)
    );
  }

  delete(_id: string): Promise<IUsuario> {
    return lastValueFrom(
      this.httpClient.delete<IUsuario>(`${this.linkUsuarios}/${_id}`)
    );
  }

  insert(formValue: IUsuario): Promise<IUsuario> {
    return lastValueFrom(
      this.httpClient.post<IUsuario>(this.linkUsuarios, formValue)
    );
  }

  update(formValue: IUsuario): Promise<IUsuario> {
    return lastValueFrom(
      this.httpClient.put<IUsuario>(
        `${this.linkUsuarios}/${formValue._id}`,
        formValue
      )
    );
  }

  constructor() {}
}
