const postgres = require("postgres");

const sql = postgres(
  `postgres://${process.env.PGSQL_USER}:${process.env.PGSQL_PASSWORD}@${process.env.PGSQL_HOST}:${process.env.PGSQL_PORT}/${process.env.PGSQL_DATABASE}`
);

const {
  users,
  persons,
  beneficiary,
} = require("../app/lib/placeholder-data.js");

const bcrypt = require("bcrypt");

async function clear() {
  try {
    let clearResult = await sql`
      DROP TABLE IF EXISTS beneficiary;
    `;

    console.log(`Cleared ${clearResult.length} table beneficiary`);

    clearResult = await sql`
      DROP TABLE IF EXISTS persons;
    `;

    console.log(`Cleared ${clearResult.length} table persons`);

    clearResult = await sql`
      DROP TABLE IF EXISTS users;
    `;

    console.log(`Cleared ${clearResult.length} table users`);

    return clearResult;
  } catch (err) {
    console.error("Error clearing tables:", err);
    throw err;
  }
}

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist

    const createTable = await sql`
          CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            email varchar(250) NOT NULL UNIQUE,
            password varchar(255) NOT NULL,
            is_active boolean NOT NULL
          );
        `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
            INSERT INTO users (id, email, password, is_active)
            VALUES (${user.id}, ${user.email}, ${hashedPassword}, true)
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedPersons() {
  try {
    // Create the "persons" table if it doesn't exist
    const createTable = await sql`
          CREATE TABLE IF NOT EXISTS persons (
            id UUID NOT NULL PRIMARY KEY,
            id_user UUID,
            first_name varchar(100) NOT NULL,
            last_name varchar(100),
            email varchar(250) NOT NULL UNIQUE,
            phone varchar(12),
            CONSTRAINT persons_users_id_fkey FOREIGN key(id_user) REFERENCES users(id)
          );
        `;

    console.log(`Created "persons" table`);

    // Insert data into the "persons" table
    const insertedPersons = await Promise.all(
      persons.map(async (person) => {
        return sql`
            INSERT INTO persons (id, id_user, first_name, last_name, email, phone)
            VALUES (${person.id}, ${person.id_user}, ${person.firtsname}, ${person.lastname}, ${person.email}, ${person.phone})
          `;
      })
    );

    console.log(`Seeded ${insertedPersons.length} persons`);

    return {
      createTable,
      persons: insertedPersons,
    };
  } catch (error) {
    console.error("Error seeding persons:", error);
    throw error;
  }
}

async function seedBeneficiary() {
  try {
    // Create the "beneficiary" table if it doesn't exist
    const createTable = await sql`
          CREATE TABLE IF NOT EXISTS beneficiary (
            id_person UUID NOT NULL,
            id_beneficiary UUID NOT NULL,
            relation_type varchar(60) NOT NULL,
            PRIMARY KEY(id_person,id_beneficiary),
            CONSTRAINT id_beneficiary_fk FOREIGN key(id_beneficiary) REFERENCES persons(id),
            CONSTRAINT id_person_fk FOREIGN key(id_person) REFERENCES persons(id)
          );
        `;

    console.log(`Created "persons" table`);

    // Insert data into the "persons" table
    const insertedBeneficiary = await Promise.all(
      beneficiary.map(async (benef) => {
        return sql`
            INSERT INTO beneficiary (id_person, id_beneficiary, relation_type)
            VALUES (${benef.id_person}, ${benef.id_beneficiary}, ${benef.relation_type})
          `;
      })
    );

    console.log(`Seeded ${insertedBeneficiary.length} beneficiary`);

    return {
      createTable,
      beneficiary: insertedBeneficiary,
    };
  } catch (error) {
    console.error("Error seeding persons:", error);
    throw error;
  }
}

async function main() {
  await clear();
  await seedUsers();
  await seedPersons();
  await seedBeneficiary();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
