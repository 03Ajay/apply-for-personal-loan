import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonalLoan } from './shared/components/personal-loan/personal-loan';
import { Header } from './shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, PersonalLoan],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
