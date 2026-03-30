import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonDesktopSidebar } from "../common-desktop-sidebar/common-desktop-sidebar";

@Component({
  selector: 'app-personal-loan',
  imports: [CommonModule, FormsModule, CommonDesktopSidebar],
  templateUrl: './personal-loan.html',
  styleUrl: './personal-loan.scss',
})
export class PersonalLoan {
  selectedProfession: string = '';

  mobile: string = '';
  pincode: string = '';

  accept1: boolean = false;
  accept2: boolean = false;

  selectProfession(type: string) {
    this.selectedProfession = type;
  }

  submitForm() {
    if (!this.mobile || this.mobile.length !== 10) {
      alert('Please enter valid 10 digit mobile number');
      return;
    }

    if (!this.pincode || this.pincode.length !== 6) {
      alert('Please enter valid 6 digit PIN code');
      return;
    }

    if (!this.accept1) {
      alert('Please accept terms and conditions');
      return;
    }

    const formData = {
      profession: this.selectedProfession,
      mobile: this.mobile,
      pincode: this.pincode,
      consent: this.accept2,
    };

    console.log(formData);
    alert('Form Submitted Successfully');
  }
}
