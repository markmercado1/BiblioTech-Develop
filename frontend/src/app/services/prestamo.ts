import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrestamoActivo {
  id: number;
  estado: string;
  fechaPrestamo: string;
  libro: { id: number; titulo: string };
}

@Injectable({
  providedIn: 'root'
})

export class Prestamo {

  private apiUrl = 'http://localhost:8080/api/prestamos';

  constructor(private http: HttpClient) {}

  validarPrestamo(estudianteId: number, libroId: number): Observable<boolean> {
    const params = new HttpParams()
      .set('estudianteId', estudianteId)
      .set('libroId', libroId);

    return this.http.get<boolean>(
      `${this.apiUrl}/validar`,
      { params }
    );
  }

  obtenerPrestamosActivos(estudianteId: number): Observable<PrestamoActivo[]> {
    const params = new HttpParams().set('estudianteId', estudianteId);

    return this.http.get<PrestamoActivo[]>(
      `${this.apiUrl}/activos`,
      { params }
    );
  }

  registrarPrestamo(estudianteId: number, libroId: number): Observable<any> {
    const params = new HttpParams()
      .set('estudianteId', estudianteId)
      .set('libroId', libroId);

    return this.http.post(
      this.apiUrl,
      null,
      { params }
    );
  }
}