import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();

async function setupDatabase() {
  // Set up the UUID extension once
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
}

async function seedUsers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, email, password)
        VALUES (${user.id}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function seedInvoices() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedInvoices = await Promise.all(
    invoices.map((invoice) =>
      client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedInvoices;
}

async function seedCustomers() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) =>
        client.sql`
          INSERT INTO customers (id, name, email, image_url)
          VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
          ON CONFLICT (id) DO NOTHING;
        `
    )
  );

  return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) =>
        client.sql`
          INSERT INTO revenue (month, revenue)
          VALUES (${rev.month}, ${rev.revenue})
          ON CONFLICT (month) DO NOTHING;
        `
    )
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    // Begin transaction
    await client.sql`BEGIN`;

    // Ensure the extension is created once
    await setupDatabase();

    // Seed data
    await seedUsers();
    await seedCustomers();
    await seedInvoices();
    await seedRevenue();

    // Commit transaction
    await client.sql`COMMIT`;

    // Return success response
    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), { status: 200 });
  } catch (error) {
    // Rollback in case of error
    await client.sql`ROLLBACK`;

    // Log the error for debugging
    console.error('Error during database seeding:', error);

    // Return error response
    return new Response(
      JSON.stringify({ error: 'An error occurred while seeding the database.' }),
      { status: 500 }
    );
  }
}
