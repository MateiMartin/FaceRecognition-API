const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const PAT = process.env.PAT;
const USER_ID = process.env.USER_ID;
const APP_ID = process.env.APP_ID;
const MODEL_ID = "face-detection";

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);



const handelApiCall = (req, res) => {
    const { input } = req.body;

    stub.PostModelOutputs(
        {
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
            },
            model_id: MODEL_ID,
            inputs: [
                {
                    data: {
                        image: {
                            url: input,
                        },
                    },
                },
            ],
        },
        metadata,
        (err, response) => {
            if (err) {
                res.status(500).json({ error: err });
            }
            if (response.status.code !== 10000) {
                res.status(500).json({ error: "Post model outputs failed, status: " + response.status.description });
            }

            res.json(response);
        }
    );
};


module.exports = {
    handelApiCall: handelApiCall
}