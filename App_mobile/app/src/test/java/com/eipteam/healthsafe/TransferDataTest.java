package com.eipteam.healthsafe;

import org.junit.Test;

import java.util.HashMap;

import static org.junit.Assert.*;

public class TransferDataTest {

    @Test
    public void mapToString() {
        HashMap<String, String> input = new HashMap<>();
        String output;
        String expected = "firstname:Thomas\nage:22\nlastname:Ducret\n";

        input.put("firstname", "Thomas");
        input.put("lastname", "Ducret");
        input.put("age", "22");

        output = TransferData.mapToString(input);

        assertEquals(expected, output);
    }

    @Test
    public void stringToMap() {
        String input = "firstname:Thomas\nage:22\nlastname:Ducret\n";
        HashMap<String, String> output;
        HashMap<String, String> expected = new HashMap<>();

        expected.put("firstname", "Thomas");
        expected.put("lastname", "Ducret");
        expected.put("age", "22");

        output = TransferData.stringToMap(input);

        assertEquals(expected, output);
    }
}