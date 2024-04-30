import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  try {
    const headerList = headers();
    const id = parseInt(headerList.get("id"));
    const cus_email = headerList.get("email");

    const prisma = new PrismaClient();

    const cartProducts = await prisma.product_carts.findMany({ where: { user_id: id }, include: { products: true } });

    let totalAmount = 0;
    cartProducts.forEach((element) => {
      let price;
      if (element.products.discount) {
        price = element.products.discount_price;
      } else {
        price = element.products.price;
      }
      totalAmount += element.qty * price;
    });

    let vat = totalAmount * 0.05;
    let payable = totalAmount + vat;

    let profile = await prisma.customer_profiles.findUnique({ where: { user_id: id } });

    let cus_details = `Name: ${profile.cus_name}, Email: ${profile.cus_email}, Address: ${profile.cus_add}, Phone: ${profile.cus_phone}`;
    let ship_details = `Name: ${profile.ship_name}, City: ${profile.ship_city}, Address: ${profile.ship_add}, Phone: ${profile.ship_phone}`;

    let tran_id = Math.floor(10000000 + Math.random() * 90000000).toString();
    let val_id = "0";
    let delivery_status = "Pending";
    let payment_status = "Pending";

    const createInvoice = await prisma.invoices.create({
      data: {
        total: totalAmount,
        vat: vat,
        payable: payable,
        cus_details: cus_details,
        ship_details: ship_details,
        tran_id: tran_id,
        val_id: val_id,
        delivary_status: delivery_status,
        payment_status: payment_status,
        user_id: id,
      },
    });

    let invoice_id = createInvoice["id"];

    for (const element of cartProducts) {
      await prisma.invoice_products.create({
        data: {
          invoice_id: invoice_id,
          product_id: element.product_id,
          user_id: id,
          qty: element.qty,
          sale_price: element.products.discount ? element.products.discount_price : element.products.price,
          color: element.color,
          size: element.size,
        },
      });
    }

    await prisma.product_carts.deleteMany({ where: { user_id: id } });

    // SslCommerz
    let paymentSettings = await prisma.sslcommerz_accounts.findFirst();

    const form = new FormData();

    form.append("store_id", paymentSettings.store_id);
    form.append("store_passwd", paymentSettings.store_passwd);
    form.append("total_amount", payable.toString());
    form.append("currency", paymentSettings.currency);
    form.append("tran_id", tran_id);

    form.append("success_url", `${paymentSettings.success_url}?tran_id=${tran_id}`);
    form.append("fail_url", `${paymentSettings.fail_url}?tran_id=${tran_id}`);
    form.append("cancel_url", `${paymentSettings.cancel_url}?tran_id=${tran_id}`);
    form.append("ipn_url", `${paymentSettings.ipn_url}?tran_id=${tran_id}`);

    form.append("cus_name", profile.cus_name);
    form.append("cus_email", profile.cus_email);
    form.append("cus_add1", profile.cus_add);
    form.append("cus_add2", profile.cus_add);
    form.append("cus_city", profile.cus_city);
    form.append("cus_state", profile.cus_state);
    form.append("cus_postcode", profile.cus_postcode);
    form.append("cus_country", profile.cus_country);
    form.append("cus_phone", profile.cus_phone);
    form.append("cus_fax", profile.cus_fax);

    form.append("shipping_method", "YES");

    form.append("ship_name", profile.ship_name);
    form.append("ship_add1", profile.ship_add);
    form.append("ship_add2", profile.ship_add);
    form.append("ship_city", profile.ship_city);
    form.append("ship_state", profile.ship_state);
    form.append("ship_country", profile.ship_country);
    form.append("ship_postcode", profile.ship_postcode);

    form.append("product_name", "According to invoice");
    form.append("product_category", "According to invoice");
    form.append("product_profile", "According to invoice");
    form.append("product_amount", "According to invoice");

    let SslRes = await fetch(paymentSettings.init_url, { method: "POST", body: form });

    let SslResJson = SslRes.json();

    return NextResponse.json({ status: "success", data: invoice_id });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error });
  }
}
