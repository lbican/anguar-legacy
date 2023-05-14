import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from '../../util/delay';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {

  @Input() formType: 'CREATE' | 'EDIT';

  @Input() student: Student;

  saving = false;

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Empty on init
  }

  save() {
    this.student.dateOfBirth = new DatePipe('en-US').transform(this.getRandomDate(), 'dd.MM.yyyy.');
    this.saving = true;
    console.log(this.student);
    if (this.formType === 'CREATE') {
      this.createNewStudent();
    } else if (this.formType === 'EDIT')  {
      this.updateStudent();
    } else {
      throw Error('UNSUPPORTED FORM TYPE');
    }
  }

  getRandomDate = (): string => {
    const currentDate = new Date();
    const randomYear = currentDate.getFullYear() - Math.floor(Math.random() * 3 + 19); // Generate a random year between 19 and 21 years ago
    const randomMonth = Math.floor(Math.random() * 12); // Generate a random month between 0 and 11
    const randomDay = Math.floor(Math.random() * 31); // Generate a random day between 0 and 30
    return new Date(randomYear, randomMonth, randomDay).toISOString().slice(0, 10);
  }


  createNewStudent() {
    this.studentService.addStudent(this.student).subscribe(
      (student: Student) => {
        this.student = student;
        this.toastrService.success('Uspješno ste spremili podatke studenta!');
        delay(2000).then(() => this.router.navigate(['students']));
      },
      () => {
        this.toastrService.error('Došlo je do pogreške prilikom spremanja podataka studenta!');
        this.saving = false;
      }
    );
  }

  updateStudent() {
    this.studentService.updateStudent(this.student).subscribe(
      (student: Student) => {
        this.student = student;
        this.toastrService.success('Uspješno ste spremili podatke studenta!');
        delay(2000).then(() => this.router.navigate(['students']));
      },
      () => {
        this.toastrService.error('Došlo je do pogreške prilikom spremanja podataka studenta!');
        this.saving = false;
      }
    );
  }

}
