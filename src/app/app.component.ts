import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Reservation, ReservationRequest, ReservationService } from './reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reservation-app';

  constructor(private reservationService: ReservationService){}

  rooms: Room[];

  roomSearchForm: FormGroup;
  currentCheckInValue: string;
  currentCheckOutValue: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  ngOnInit(){

    this.roomSearchForm = new FormGroup({
      checkin: new FormControl(''),
      checkout: new FormControl(''),
      roomNumber:  new FormControl('')
    });


    this.roomSearchForm.valueChanges.subscribe( form => {
      this.currentCheckInValue = form.checkin;
      this.currentCheckOutValue = form.checkout;

      if (form.roomNumber) {
        const roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }

    });

    this.rooms = [
                  new Room("127", "127", "150"),
                  new Room("128", "128", "150"),
                  new Room("137", "137", "250"),
                  new Room("122", "122", "150")
                ];

    this.getCurrentReservations();

  }

  getCurrentReservations(){
    this
    .reservationService
    .getReservatioins()
    .subscribe(getResult => {
      console.log(getResult);
      this.currentReservations = getResult;
    });
  }

  createReservation(){
    this.reservationService
      .createReservation(
        new ReservationRequest(
          this.currentRoomNumber,
          this.currentCheckOutValue,
          this.currentCheckOutValue,
          this.currentPrice
        )).subscribe(postResult => {
          console.log(postResult);
          this.getCurrentReservations();
        });
  }

}


export class Room{
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string){
      this.id = id;
      this.price = price;
      this.roomNumber =  roomNumber;
  }
}
