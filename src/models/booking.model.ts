export interface BookingModel {
  guestNumber: number;
  firstName: string;
  lastName: string;
  restoran: {
    restaurantId: number;
    name: string;
  };
  userId: number;
  status: {
    statusId: number;
    status: string;
  };
  statusId: number;
  // restaurantId: number;
}
