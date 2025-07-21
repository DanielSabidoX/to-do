import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  tema: string = 'light';
  modo_tema: string = 'Modo Claro';

  constructor() { }

  toggleTheme(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.tema = checkbox.checked ? 'dark' : 'light';
    this.modo_tema = checkbox.checked ? 'Modo Escuro' : 'Modo Claro';
    document.documentElement.setAttribute('data-bs-theme', this.tema);
  }

}
