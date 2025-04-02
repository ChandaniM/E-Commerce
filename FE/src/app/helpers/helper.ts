import { Injectable } from "@angular/core";
import { ToastService } from "../Services/toast.service";

@Injectable({
  providedIn: "root",
})
export class Helper {
  constructor(private toastService: ToastService) {}

  showMessage(message: string, type: string) {
    this.toastService.showToast(message, type);
  }

  formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  calculateTotalCost(quantity: number, pricePerItem: number): number {
    return quantity * pricePerItem;
  }
  
  calculateDiscountedCost(quantity: number, pricePerItem: number, discountPercentage: number): number {
    const totalCost = this.calculateTotalCost(quantity, pricePerItem);
    const discountAmount = (totalCost * discountPercentage) / 100;
    return totalCost - discountAmount;
  }

  refreshPage() {
    window.location.reload();
  }
}
