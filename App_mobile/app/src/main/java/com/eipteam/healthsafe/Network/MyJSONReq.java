package com.eipteam.healthsafe.Network;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.Request;
import okhttp3.RequestBody;

public class MyJSONReq {
    public Request postRequest(JSONObject js) throws IOException {
        String url = "http://10.0.2.2:3000/mobile";

        MediaType MEDIA_TYPE = MediaType.parse("application/json");

        RequestBody body = RequestBody.create(MEDIA_TYPE, js.toString());

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .build();

        return (request);
    }
}
