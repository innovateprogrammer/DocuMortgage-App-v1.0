

document.getElementById('generate').addEventListener('click',()=>{
    document.getElementById('output').innerHTML="";
    document.getElementById('b1').classList.add("hideelement");
    document.getElementById('b2').classList.add("showloading");
    document.getElementById('boxes').classList.add("showloading");
    const bankname=document.getElementById('bank').value;
    if(isValid(bankname))
    {
        fetchData(bankname);
    }
    
    
    });

    async function fetchData(bank) {
        const url = 'http://localhost:3000/api/data';
        try {
            await fetch(url, {
                method: 'POST',              // Specify the method as POST
                headers: {
                    'Content-Type': 'application/json',
                    'bank':bank
                },
                body: { 'bank':bank }   // Convert the data to JSON format
            }).then(
                response => response.text()
            ).then(data=>{
                var ht1="Mortgage Document Requirements";
                var ht2="Key improvements and explanations"
                var h1=data.indexOf(ht1);
                var h2=data.indexOf(ht2);
                data="Pointwise"+data.slice(h1+ht1.length,h2-5);
                document.getElementById('output').innerHTML=data;
                document.getElementById('b1').classList.remove("hideelement");
                document.getElementById('b2').classList.remove("showloading");
                document.getElementById('boxes').classList.remove("showloading");
            });

        } catch (error) {
            console.error('Error:', error);  // Handle errors
        }
    }

    function isValid(bank)
    {
        if(bank!="" && bank.trim()!="")
        {
            return true;
        }
        else{
            return false;
        }
    }
    /*
    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/hf-inference/models/Intel/dynamic_tinybert",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    
    query({ inputs: {
        "question": "What is my name?",
        "context": "My name is Clara and I live in Berkeley."
    } }).then((response) => {
        console.log(JSON.stringify(response));
    });*/


    async function getChatGPT4Response(prompt) {
            const apiKey = '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'; // Replace with your OpenAI API key
            //
            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o", // You can use "gpt-4" if available
                        messages: [{ role: "user", content: prompt }],
                        max_tokens: 100
                    })
                });
        
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
        
                const data = await response.json();
                console.log((data.choices[0].message.content));
                document.getElementById('cat').innerHTML=data.choices[0].message.content;
                document.getElementById('boxes').classList.remove("showloading");
                document.getElementById('generatetext').classList.remove("hidetext");
            } catch (error) {
                console.error("Error while fetching ChatGPT response:", error);
                return "Failed to get response";
            }

        }