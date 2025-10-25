#!/usr/bin/env python3
"""
Test script for firefighter_manager CRUD operations
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from firefighter_manager import firefighter_manager

def test_firefighter_crud():
    """Test all CRUD operations for firefighter management"""
    
    manager = firefighter_manager()
    
    print("=== Testing Firefighter CRUD Operations ===\n")
    
    # Test 1: Get all firefighters (initial state)
    print("1. Getting all firefighters (initial)...")
    firefighters = manager.get_all_firefighters()
    print(f"   Result: {firefighters}\n")
    
    # Test 2: Insert a new firefighter
    print("2. Inserting new firefighter...")
    test_code = "TEST001"
    test_first = "John"
    test_last = "Doe" 
    test_email = "john.doe@example.com"
    
    result = manager.insert_firefighter(test_code, test_first, test_last, test_email)
    print(f"   Insert result: {result}\n")
    
    if result:
        # Test 3: Get the inserted firefighter
        print("3. Getting the inserted firefighter...")
        firefighter = manager.get_firefighter(test_code)
        print(f"   Get result: {firefighter}\n")
        
        # Test 4: Update the firefighter
        print("4. Updating the firefighter...")
        updated_first = "Jane"
        updated_last = "Smith"
        updated_email = "jane.smith@example.com"
        
        update_result = manager.update_firefighter(test_code, test_code, updated_first, updated_last, updated_email)
        print(f"   Update result: {update_result}\n")
        
        # Test 5: Get the updated firefighter
        print("5. Getting the updated firefighter...")
        updated_firefighter = manager.get_firefighter(test_code)
        print(f"   Updated firefighter: {updated_firefighter}\n")
        
        # Test 6: Get all firefighters (should include our test firefighter)
        print("6. Getting all firefighters (with test data)...")
        all_firefighters = manager.get_all_firefighters()
        print(f"   All firefighters: {all_firefighters}\n")
        
        # Test 7: Delete the firefighter (soft delete)
        print("7. Deleting the firefighter...")
        delete_result = manager.delete_firefighter(test_code)
        print(f"   Delete result: {delete_result}\n")
        
        # Test 8: Try to get the deleted firefighter (should return None)
        print("8. Trying to get deleted firefighter...")
        deleted_firefighter = manager.get_firefighter(test_code)
        print(f"   Deleted firefighter: {deleted_firefighter}\n")
        
        # Test 9: Get all firefighters (should not include deleted one)
        print("9. Getting all firefighters (after deletion)...")
        final_firefighters = manager.get_all_firefighters()
        print(f"   Final firefighters: {final_firefighters}\n")
    
    print("=== Test completed ===")

if __name__ == "__main__":
    test_firefighter_crud()