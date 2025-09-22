import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { imageUrl, mood } = await req.json();

    // Call Hugging Face BLIP model for image captioning
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("HF_API_KEY")}`, // stored in Supabase secrets
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: imageUrl }),
      }
    );

    const result = await response.json();
    const baseCaption = result[0]?.generated_text || "No caption found";

    // Apply mood twist
    const finalCaption = `${baseCaption} (expressed in a ${mood} mood)`;

    return new Response(JSON.stringify({ caption: finalCaption }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
