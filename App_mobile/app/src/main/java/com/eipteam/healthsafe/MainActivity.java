package com.eipteam.healthsafe;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    private Integer code = -2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public static void errorMsg(Context context, String err_msg) {
        Toast.makeText(context, err_msg, Toast.LENGTH_LONG).show();
    }

    public void connection(View view)
    {
        Intent intent = new Intent(this, ChooseDisplay.class);

        EditText identifiant = (EditText) findViewById(R.id.identifiant);
        String id1 = identifiant.getText().toString();

        EditText password = (EditText) findViewById(R.id.password);
        String id2 = password.getText().toString();

        try {
            postRequest(id1, id2);
        } catch (IOException e) {
            e.printStackTrace();
        }

        while (code == -2);

        if (code == 200) {
            startActivity(intent);
        }
        else {
            errorMsg(getApplicationContext(), "WRONG ID OR PASSWD");
        }
    }

    public void postRequest(String login, String pass) throws IOException {
        String url = "http://10.0.2.2:3000/mobile";

        MediaType MEDIA_TYPE = MediaType.parse("application/json");
        OkHttpClient client = new OkHttpClient();

        JSONObject postData = new JSONObject();
        try {
            postData.put("nom", login);
            postData.put("ville", pass);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        RequestBody body = RequestBody.create(MEDIA_TYPE, postData.toString());

        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                code = -1;
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                code = response.code();
            }
        });
    }
}