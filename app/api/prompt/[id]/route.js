import { connecttoDB } from "@utils/database";
import Prompt from "@models/prompt";

//get

export const GET = async (request, {params}) => {
    try {
        await connecttoDB()

        const prompt = await Prompt.findById(params.id).populate('creator');
        
        if(!prompt) return new Response("Prompt not found", {status : 400})

        return new Response(JSON.stringify(prompt), {status : 200})
        
    } catch (error) {

        return new Response("failed to fetch prompt", {status : 500})
        
    }
}

// patch

export const PATCH = async (request, {params}) => {

    const {prompt,tag} = await request.json();

    try{
        await connecttoDB()

        const existingPrompt  = await Prompt.findById(params.id)
        if(!existingPrompt) return new Response("Prompt not found", {status : 400})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status : 200})
            
    } catch (error) {

        return new Response("failed to update prompt", {status : 500})
        
    }
}


// DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connecttoDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};