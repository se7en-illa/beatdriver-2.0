/* Core */
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const { amount = 1 } = body;

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({ data: amount });
}

/*
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { amount = 1 } = body;

  // Example API call using Axios
  const response = await axios.post('https://example.com/api/endpoint', { amount });

  return NextResponse.json({ data: response.data });
}

*/
