package com.eipteam.healthsafe.nfc_manager.display;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.EditText;

import com.eipteam.healthsafe.R;

import java.util.ArrayList;

public class ListElementAdapter extends BaseAdapter {

    private final ArrayList<Element> listElem;
    private final Context context;

    public ListElementAdapter(Context _context, ArrayList<Element> _listElem) {
        context = _context;
        listElem = _listElem;
    }

    @Override
    public int getCount() {
        return listElem.size();
    }

    @Override
    public Object getItem(int position) {
        return listElem.get(position);
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        final ListElementHolder holder;

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.activity_custom_listview, parent, false);
            holder = new ListElementHolder();
            holder.text = convertView.findViewById(R.id.txView);
            holder.edit = convertView.findViewById(R.id.edText);
            convertView.setTag(holder);
        } else {
            holder = (ListElementHolder) convertView.getTag();
        }

        holder.text.setText(listElem.get(position).text);
        holder.text.setId(position);

        if (listElem.get(position).edit.equals("N/A"))
            listElem.get(position).edit = "";
        holder.edit.setText(listElem.get(position).edit);
        holder.edit.setId(position);

        holder.edit.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {
                if (!listElem.isEmpty()) {
                    final int position = v.getId();
                    final EditText Caption = (EditText) v;
                    listElem.get(position).edit = Caption.getText().toString();
                    notifyDataSetChanged();
                }
            }
        });

        return convertView;
    }
}
